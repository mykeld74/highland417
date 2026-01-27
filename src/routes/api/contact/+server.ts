import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { logoSvgContent } from '$lib/logo';

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const phone = formData.get('phone')?.toString();
		const message = formData.get('message')?.toString();

		// Validate required fields
		if (!name || !email || !message) {
			return json({ error: 'All fields are required' }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Get Resend configuration from environment variables
		// Try platform.env first (Cloudflare), then process.env (Node.js), then import.meta.env (Vite)
		const env = platform?.env as Record<string, string | undefined> | undefined;
		const resendApiKey =
			env?.RESEND_API_KEY || process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
		const toEmail =
			env?.CONTACT_EMAIL || process.env.CONTACT_EMAIL || import.meta.env.CONTACT_EMAIL;
		const fromEmail =
			env?.FROM_EMAIL ||
			process.env.FROM_EMAIL ||
			import.meta.env.FROM_EMAIL ||
			'onboarding@resend.dev'; // Default Resend email for testing

		// Inline the SVG logo and set size to 150px
		const logoSvg = logoSvgContent
			.replace(/<\?xml[^>]*\?>/i, '')
			.replace(
				/<svg([^>]*)>/,
				'<svg$1 width="150" height="150" style="width: 150px; height: 150px; max-width: 150px; display: block; margin: 0 auto;">'
			);

		// HTML escape function for security
		function escapeHtml(text: string): string {
			const map: Record<string, string> = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};
			return text.replace(/[&<>"']/g, (m) => map[m]);
		}

		// Escape user input
		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safePhone = phone ? escapeHtml(phone) : '';
		const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
		const phoneNumber = phone ? phone.replace(/[^\d+]/g, '') : '';

		// Email content
		const phoneText = phone ? `\nPhone: ${phone}` : '';
		const subject = `Contact Form Submission from ${name}`;
		const textEmail = `Contact Form Submission\n\nName: ${name}\nEmail: ${email}${phoneText}\n\nMessage:\n${message}`;
		const phoneHtml = phone
			? `<tr>
					<td style="padding: 12px 0; border-bottom: 1px solid rgba(237, 209, 174, 0.1);">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #edd1ae; font-weight: 600; padding-right: 16px; width: 100px;">Phone:</td>
								<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #f0e6d9;">
									<a href="tel:${phoneNumber}" style="color: #BC6915; text-decoration: none;">${safePhone}</a>
								</td>
							</tr>
						</table>
					</td>
				</tr>`
			: '';

		const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Contact Form Submission</title>
	<!--[if mso]>
	<style type="text/css">
		table {border-collapse: collapse; border-spacing: 0; margin: 0;}
		div, td {padding: 0;}
		div {margin: 0 !important;}
	</style>
	<![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0a0908; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0908; background-image: radial-gradient(ellipse at 50% 40%, #1a1612 0%, #100e0b 40%, #0a0908 70%, #050404 100%);">
		<tr>
			<td align="center" style="padding: 40px 20px;">
				<!-- Main Container -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: rgba(10, 9, 8, 0.95); border: 1px solid rgba(237, 209, 174, 0.1); border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
					<!-- Header -->
					<tr>
						<td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(237, 209, 174, 0.1);">
							<!-- Logo - Desktop Only -->
							<div class="logo-container">
								${logoSvg}
							</div>
							<h1 style="margin: 20px 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 700; color: #edd1ae; letter-spacing: 0.02em;">Contact Form Submission</h1>
						</td>
					</tr>
					<!-- Content -->
					<tr>
						<td style="padding: 30px 40px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
								<!-- Name -->
								<tr>
									<td style="padding: 12px 0; border-bottom: 1px solid rgba(237, 209, 174, 0.1);">
										<table width="100%" cellpadding="0" cellspacing="0" border="0">
											<tr>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #edd1ae; font-weight: 600; padding-right: 16px; width: 100px;">Name:</td>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #f0e6d9;">${safeName}</td>
											</tr>
										</table>
									</td>
								</tr>
								<!-- Email -->
								<tr>
									<td style="padding: 12px 0; border-bottom: 1px solid rgba(237, 209, 174, 0.1);">
										<table width="100%" cellpadding="0" cellspacing="0" border="0">
											<tr>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #edd1ae; font-weight: 600; padding-right: 16px; width: 100px;">Email:</td>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #f0e6d9;">
													<a href="mailto:${safeEmail}" style="color: #BC6915; text-decoration: none;">${safeEmail}</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								${phoneHtml}
								<!-- Message -->
								<tr>
									<td style="padding: 20px 0 0;">
										<table width="100%" cellpadding="0" cellspacing="0" border="0">
											<tr>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #edd1ae; font-weight: 600; padding-bottom: 12px;">Message:</td>
											</tr>
											<tr>
												<td style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #f0e6d9; line-height: 1.6; padding: 16px; background-color: rgba(237, 209, 174, 0.05); border-left: 3px solid #BC6915; border-radius: 4px;">
													${safeMessage}
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<!-- Footer -->
					<tr>
						<td style="padding: 30px 40px; text-align: center; border-top: 1px solid rgba(237, 209, 174, 0.1);">
							<p style="margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: rgba(237, 209, 174, 0.6); line-height: 1.5;">
								This email was sent from the Highland 417 contact form.
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<!-- Responsive Styles -->
	<style type="text/css">
		.logo-container {
			display: block;
		}
		@media only screen and (max-width: 600px) {
			table[role="presentation"] {
				width: 100% !important;
			}
			td[style*="padding: 40px 40px"] {
				padding: 20px !important;
			}
			td[style*="padding: 30px 40px"] {
				padding: 20px !important;
			}
			h1 {
				font-size: 24px !important;
				margin-top: 0 !important;
			}
			td[style*="width: 100px"] {
				width: 80px !important;
				font-size: 13px !important;
				padding-right: 12px !important;
			}
			td[style*="font-size: 14px"] {
				font-size: 13px !important;
			}
			.logo-container {
				display: none !important;
			}
		}
		@media only screen and (max-width: 480px) {
			td[style*="padding: 40px 40px"] {
				padding: 16px !important;
			}
			td[style*="padding: 30px 40px"] {
				padding: 16px !important;
			}
			h1 {
				font-size: 20px !important;
				margin-top: 0 !important;
			}
			.logo-container {
				display: none !important;
			}
		}
	</style>
</body>
</html>
		`;

		if (!resendApiKey || !toEmail) {
			console.error('Missing Resend configuration');
			return json(
				{ error: 'Email service is not configured. Please contact the administrator.' },
				{ status: 500 }
			);
		}

		// Send email using Resend
		const resend = new Resend(resendApiKey);
		await resend.emails.send({
			from: fromEmail,
			to: toEmail,
			replyTo: email,
			subject,
			text: textEmail,
			html: htmlEmail
		});

		return json({ message: 'Message sent successfully!' }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
	}
};
