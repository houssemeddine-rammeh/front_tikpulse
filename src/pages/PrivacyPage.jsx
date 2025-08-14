import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  Chip,
} from '@mui/material';
import { Security, Policy, Gavel } from '@mui/icons-material';
import Layout from '../components/layout/Layout';

const PrivacyPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Security sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Privacy Policy & Terms of Service
          </Typography>
          <Typography variant="h6" color="text.secondary">
          DASHTRACER - Altadigit
          </Typography>
          <Chip 
            label="Effective Date: July 22, 2025" 
            color="primary" 
            sx={{ mt: 2 }}
          />
        </Box>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Policy sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              Privacy Policy
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            Altadigit operates the DASHTRACER application and platform. This Privacy Policy explains how we collect, use, and protect your personal information when you use DASHTRACER.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect and process the following data:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="DASHTRACER public profile data (followers, likes, videos, diamonds)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Contact details (email, phone number)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment information (e.g., RIB, PayPal)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Live session statistics and performance data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Messages or support tickets sent via our platform" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use your data to:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Provide and personalize app services" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Display performance dashboards and bonuses" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Manage agency assignments and communications" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Generate statistics and analytics for agency managers" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notify users about events, performance, or violations" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            3. Sharing Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Your data may be shared with:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Your assigned manager within the agency" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Admins and support staff of Altadigit for operational needs" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
            We do not sell or rent your personal data to third parties.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            4. Data Storage and Security
          </Typography>
          <Typography variant="body1" paragraph>
            Your information is stored securely on protected servers. We implement industry-standard encryption and access control measures to protect your data.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            In accordance with applicable laws (e.g., GDPR), you may:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Access or correct your personal data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Request data deletion" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Object to processing for legitimate reasons" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            Please contact us at{' '}
            <Link href="mailto:contact@dashtracer.info" color="primary">
              contact@dashtracer.info
            </Link>{' '}
            to exercise these rights.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            6. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain data only as long as necessary to fulfill platform functions or comply with legal requirements.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            7. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy occasionally. Continued use of the app after changes implies your acceptance of the revised terms.
          </Typography>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Gavel sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              Terms of Service
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            These Terms of Service ("Terms") apply to your access and use of the DASHTRACER application and platform, operated by Altadigit, based in Tunisia. By using DASHTRACER, you agree to be bound by these Terms and our Privacy Policy.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By registering for or using DASHTRACER, you confirm that you have read, understood, and agreed to be bound by these Terms and the Privacy Policy. If you do not agree, do not use the platform.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            2. Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            You must be at least 13 years old to use DASHTRACER. If you are under 18, you must have the consent of a parent or legal guardian. Use of DASHTRACER may be subject to a valid agency agreement if applicable.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            3. User Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Keeping your login credentials confidential" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ensuring the information you provide is complete and accurate" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notifying us of any unauthorized use of your account" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            We may suspend or terminate accounts for suspected violations of these Terms.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            4. Permitted Use
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use DASHTRACER only for its intended purposes, such as performance tracking, communication with your agency, and managing live session data. You must not:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Misuse or overload the platform" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bypass any security measures" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Manipulate analytics or bonus systems" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Use the app in violation of DASHTRACER's or Altadigit's terms" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            5. Data Usage
          </Typography>
          <Typography variant="body1" paragraph>
            You grant Altadigit the right to process your DASHTRACER public data, performance statistics, and communications solely for operational and analytics purposes. See our Privacy Policy for full details.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            6. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All platform content, software, branding, and materials are the exclusive property of Altadigit. You may not reproduce, distribute, or modify any part of DASHTRACER without prior written consent.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            7. Third-Party Links and Content
          </Typography>
          <Typography variant="body1" paragraph>
            DASHTRACER may include links or integrations with third-party services. Altadigit is not responsible for third-party content, data practices, or service availability.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            8. Disclaimer of Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            DASHTRACER is provided "as is" and "as available." We do not guarantee uninterrupted access, accuracy, or completeness of the platform. Use it at your own risk.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            9. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the extent permitted by law, Altadigit is not liable for any:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="Indirect, incidental, or consequential damages" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Loss of data, revenue, or business opportunities" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Errors or service interruptions caused by third-party platforms (e.g., DASHTRACER)" />
            </ListItem>
          </List>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            10. Termination of Access
          </Typography>
          <Typography variant="body1" paragraph>
            We may suspend or terminate your account:
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemText primary="If you breach these Terms" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Upon agency termination or account misuse" />
            </ListItem>
            <ListItem>
              <ListItemText primary="For legal or compliance reasons" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            You may also stop using DASHTRACER at any time.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            11. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms are governed by the laws of Tunisia. Any legal disputes shall be exclusively resolved in the courts of Tunisia.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            12. Updates to These Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to update these Terms. Any changes will be communicated via email or platform notification. Continued use of DASHTRACER after changes indicates your acceptance.
          </Typography>

          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            13. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about these Terms, reach us at:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              📧
            </Typography>
            <Link href="mailto:contact@dashtracer.info" color="primary">
              contact@dashtracer.info
            </Link>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center', p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Altadigit. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default PrivacyPage; 