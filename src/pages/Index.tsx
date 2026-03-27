import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Users, Wallet, ArrowRight, CheckCircle2, TrendingUp, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">R</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Rejoice Trust</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="gradient-primary border-0">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trusted by 2,000+ members across Nigeria
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              Save Together,{" "}
              <span className="text-gradient">Grow Together</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
              Join Nigeria's most trusted digital Ajo platform. Create or join savings groups,
              contribute seamlessly, and receive your payout — all secured and transparent.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gradient-primary border-0 text-base h-12 px-8">
                <Link to="/register">
                  Start Saving Today <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
                <a href="#how-it-works">Learn How It Works</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
            initial="hidden" animate="visible"
          >
            {[
              { label: "Active Members", value: "2,000+" },
              { label: "Groups Created", value: "350+" },
              { label: "Total Saved", value: "₦250M+" },
              { label: "Successful Payouts", value: "5,000+" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i + 4} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need for <span className="text-gradient">Smart Savings</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete platform designed for the modern Ajo experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Group Management", desc: "Create or join Ajo groups with flexible contribution amounts, cycles, and member limits." },
              { icon: Wallet, title: "Seamless Payments", desc: "Contribute via bank transfer, card, or USSD. Automated reminders keep everyone on track." },
              { icon: TrendingUp, title: "Real-Time Tracking", desc: "Monitor contributions, view payout schedules, and track group performance live." },
              { icon: Shield, title: "KYC Verified", desc: "Every member is verified with BVN and ID for trust and security across all groups." },
              { icon: Lock, title: "Secure & Transparent", desc: "Bank-grade encryption, audit trails, and transparent payout rotation everyone can see." },
              { icon: Globe, title: "24/7 Access", desc: "Manage your savings anytime, anywhere — from your phone, tablet, or computer." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-background rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              How <span className="text-gradient">Ajo</span> Works
            </h2>
            <p className="text-muted-foreground text-lg">Simple steps to start your savings journey</p>
          </div>
          <div className="space-y-12">
            {[
              { step: "01", title: "Register & Verify", desc: "Create your account, complete KYC verification with your BVN and valid ID." },
              { step: "02", title: "Join or Create a Group", desc: "Browse available groups or create your own. Set contribution amount, cycle, and member limit." },
              { step: "03", title: "Pick Your Seat", desc: "Select your preferred payout position in the rotation. First seat pays out first." },
              { step: "04", title: "Contribute & Receive", desc: "Make timely contributions each cycle. When it's your turn, receive the full pool payout." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="flex gap-6 md:gap-10 items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-gradient">Rejoice Trust?</span>
              </h2>
              <div className="space-y-5">
                {[
                  "Verified members only — BVN & ID checked",
                  "Automated payout rotation, no manual hassle",
                  "Real-time contribution tracking & reminders",
                  "Penalty system for late payments ensures discipline",
                  "Admin dashboard for full group oversight",
                  "Dedicated support team available 24/7",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="gradient-primary border-0 mt-8">
                <Link to="/register">Join Now — It's Free <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="gradient-hero rounded-2xl p-10 text-white">
              <h3 className="font-display text-2xl font-bold mb-4">Start a Group Today</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Whether you're saving for a business, school fees, or a rainy day — Ajo brings
                your community together to achieve financial goals faster.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-white/60" /> Min 5, Max 30 members per group
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-white/60" /> Daily, Weekly, or Monthly cycles
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-white/60" /> ₦1,000 — ₦1,000,000 per contribution
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your <span className="text-gradient">Ajo Journey?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join thousands of Nigerians building financial discipline through community savings.
          </p>
          <Button size="lg" asChild className="gradient-primary border-0 text-base h-12 px-10">
            <Link to="/register">Create Your Free Account <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-white font-display font-bold">R</span>
                </div>
                <span className="font-display font-bold text-lg">Rejoice Trust</span>
              </div>
              <p className="text-sm text-muted-foreground">Nigeria's most trusted digital Ajo savings platform.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><a href="#features" className="hover:text-foreground transition-colors">Features</a></p>
                <p><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></p>
                <p><Link to="/register" className="hover:text-foreground transition-colors">Register</Link></p>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>help@rejoicetrust.com</p>
                <p>+234 800 000 0000</p>
                <p>FAQ & Help Center</p>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>AML Policy</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rejoice Trust Ajo Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
