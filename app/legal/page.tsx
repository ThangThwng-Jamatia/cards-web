'use client';

import { motion } from 'framer-motion';
import LiquidLightBackground from '@/components/LiquidLightBackground';

export default function Legal() {
  return (
    <div className="min-h-screen relative">
      <LiquidLightBackground />

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

                <h3 className="text-xl text-white pt-4">Apps Covered</h3>
                <p>
                  This policy applies to all apps published by Minor Devs Studios, including all the published apps and any future apps unless a separate policy is provided.
                </p>

                <h3 className="text-xl text-white pt-4">Information We Collect</h3>
                <p>
                  App data is saved on your device and local data. Deleting the app removes it: Many features are stored locally on your device and are not sent to our servers.
                </p>
                <p>
                  We may use privacy-friendly analytics or crash reports to improve the performance for the apps. These do not include information like your name or contact unless you provide it in a support message.
                </p>

                <h3 className="text-xl text-white pt-4">Permissions</h3>
                <p>
                  Some apps may request permissions (e.g., camera, photos, storage, etc.) only to deliver features you choose. Denying a permission may limit that feature but the rest of the app should work.
                </p>

                <h3 className="text-xl text-white pt-4">How We Use Your Information</h3>
                <p>
                  We use the information we collect to:-
                  <p></p>
                  <br />
                  - Provide and improve features
                  <br />
                  - Keep the Services secure and reliable
                  <br />
                  - Respond to support requests
                  <br />
                  - Comply with law and store required records
                  <p></p>
                </p>
                <p> What We Don&apos;t Do:-
                <p></p>
                  <ul>
                    <li> - We don&apos;t Sell your personal data to third parties</li>
                    <li> - We don&apos;t collect more than needed for the feature to work.</li>
                    <li> - We don&apos;t track you across unrelated apps or websites.</li>
                  </ul>
                </p>

                <h3 className="text-xl text-white pt-4">Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing.
                </p>

                <h3 className="text-xl text-white pt-4">Third-Party Services</h3>
                <p>
                Some apps may integrate trusted SDKs/services (e.g., Google Play Services, Firebase Analytics/Google Analytics, AdMob). Their use is limited to app functionality, analytics, or diagnostics. See their privacy policies for details.
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
                  By installing or using any Minor Devs Studios app or website, you agree to these Terms.
                </p>

                <h3 className="text-xl text-white pt-4">License to Use</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to use our applications for personal, non-commercial purposes, subject to these terms. You may not modify, distribute, or create derivative works based on our applications without our prior written consent.
                </p>

                <h3 className="text-xl text-white pt-4">User Responsibilities</h3>
                <p>
                  You own the content you create. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use our services only for lawful purposes.
                </p>

                <h3 className="text-xl text-white pt-4">Intellectual Property</h3>
                <p>
                  All content, features, and functionality of our applications are owned by Minor Devs Studios and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl text-white pt-4">In-App Purchases & Subscriptions</h3>
                <p>
                  Minor Devs Studios may offer in-app purchases and subscriptions. Purchases are handled by the app store.
                </p>
                <p className="text-red-500">
                  Please Note: All the In-App Purchases are final, and no refunds will be issued after the purchase.
                </p>

                <h3 className="text-xl text-white pt-4">Limitation of Liability</h3>
                <p>
                  Minor Devs Studios is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
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
                  <p>Email: <a href="mailto:minordevsbusiness@gmail.com" className="text-neutral-300 hover:text-white transition-colors underline">minordevsbusiness@gmail.com</a></p>
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
