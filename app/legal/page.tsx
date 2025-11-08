'use client';

import { motion } from 'framer-motion';
import GradientBackground from '@/components/GradientBackground';

export default function Legal() {
  return (
    <div className="min-h-screen relative">
      <GradientBackground />

      <section className="min-h-screen px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
              Legal Information
            </h1>
            <p className="text-lg text-neutral-400 font-light">
              Privacy Policy, Terms of Use, and Contact Information
            </p>
          </div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light text-white border-b border-white/10 pb-4">
                Privacy Policy
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  At Minor Devs Studios, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our applications.
                </p>

                <h3 className="text-xl text-white pt-4">Information We Collect</h3>
                <p>
                  We may collect information that you provide directly to us, such as when you create an account, use our apps, or contact us for support. This may include your name, email address, and usage data.
                </p>

                <h3 className="text-xl text-white pt-4">How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to ensure the security and proper functioning of our applications.
                </p>

                <h3 className="text-xl text-white pt-4">Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                </p>

                <h3 className="text-xl text-white pt-4">Third-Party Services</h3>
                <p>
                  Our apps may use third-party services that collect information used to identify you. We ensure these services comply with applicable data protection laws.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light text-white border-b border-white/10 pb-4">
                Terms of Use
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  By accessing and using Minor Devs Studios applications, you agree to be bound by these Terms of Use and all applicable laws and regulations.
                </p>

                <h3 className="text-xl text-white pt-4">License to Use</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to use our applications for personal, non-commercial purposes, subject to these terms.
                </p>

                <h3 className="text-xl text-white pt-4">User Responsibilities</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use our services only for lawful purposes.
                </p>

                <h3 className="text-xl text-white pt-4">Intellectual Property</h3>
                <p>
                  All content, features, and functionality of our applications are owned by Minor Devs Studios and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl text-white pt-4">Limitation of Liability</h3>
                <p>
                  Minor Devs Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
                </p>

                <h3 className="text-xl text-white pt-4">Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our applications following any changes constitutes acceptance of those changes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light text-white border-b border-white/10 pb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-neutral-300 font-light leading-relaxed">
                <p>
                  If you have any questions about our Privacy Policy, Terms of Use, or any of our applications, please contact us:
                </p>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-2">
                  <p className="text-white">Minor Devs Studios</p>
                  <p>Email: <a href="mailto:support@minordevs.studio" className="text-neutral-300 hover:text-white transition-colors underline">support@minordevs.studio</a></p>
                </div>

                <p className="pt-4 text-sm text-neutral-400">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
