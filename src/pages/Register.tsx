import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    bvn: "", nin: "", dob: "", gender: "", address: "", state: "", lga: "",
    bankName: "", accountNumber: "", accountName: "",
    nextOfKinName: "", nextOfKinPhone: "", nextOfKinRelationship: "",
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setLoading(false);
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
      return;
    }

    // Update profile with additional KYC data
    if (data.user) {
      // Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await supabase.from("profiles").update({
        phone: form.phone,
        bvn: form.bvn,
        nin: form.nin,
        date_of_birth: form.dob || null,
        gender: form.gender,
        address: form.address,
        state: form.state,
        lga: form.lga,
        bank_name: form.bankName,
        account_number: form.accountNumber,
        account_name: form.accountName,
        next_of_kin_name: form.nextOfKinName,
        next_of_kin_phone: form.nextOfKinPhone,
        next_of_kin_relationship: form.nextOfKinRelationship,
      }).eq("user_id", data.user.id);
    }

    setLoading(false);
    toast({ title: "Registration successful!", description: "Please check your email to verify your account." });
    navigate("/login");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/3" />
      
      <motion.div 
        className="w-full max-w-lg relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">R</span>
            </div>
            <span className="font-display font-bold text-2xl text-foreground">Rejoice Trust</span>
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s <= step ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                }`}
                animate={{ scale: s === step ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >{s}</motion.div>
              {s < 4 && <div className={`w-8 h-0.5 transition-colors ${s < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-2xl">
              {step === 1 && "Personal Info"}
              {step === 2 && "KYC Verification"}
              {step === 3 && "Bank Details"}
              {step === 4 && "Next of Kin"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Let's get to know you"}
              {step === 2 && "Verify your identity for security"}
              {step === 3 && "Where should we send your payouts?"}
              {step === 4 && "Emergency contact information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+234 800 000 0000" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Min 8 characters" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="••••••••" required />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>BVN (Bank Verification Number)</Label>
                        <Input value={form.bvn} onChange={e => update("bvn", e.target.value)} placeholder="22XXXXXXXXX" maxLength={11} />
                      </div>
                      <div className="space-y-2">
                        <Label>NIN (National Identification Number)</Label>
                        <Input value={form.nin} onChange={e => update("nin", e.target.value)} placeholder="00000000000" maxLength={11} />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select onValueChange={v => update("gender", v)} value={form.gender}>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={form.address} onChange={e => update("address", e.target.value)} placeholder="House number, street name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input value={form.state} onChange={e => update("state", e.target.value)} placeholder="Lagos" />
                        </div>
                        <div className="space-y-2">
                          <Label>LGA</Label>
                          <Input value={form.lga} onChange={e => update("lga", e.target.value)} placeholder="Ikeja" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Select onValueChange={v => update("bankName", v)} value={form.bankName}>
                          <SelectTrigger><SelectValue placeholder="Select bank" /></SelectTrigger>
                          <SelectContent>
                            {["GTBank", "First Bank", "UBA", "Access Bank", "Zenith Bank", "Stanbic IBTC", "Fidelity Bank", "Union Bank", "Sterling Bank", "Wema Bank"].map(b => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input value={form.accountNumber} onChange={e => update("accountNumber", e.target.value)} placeholder="0000000000" maxLength={10} />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Name</Label>
                        <Input value={form.accountName} onChange={e => update("accountName", e.target.value)} placeholder="Will be auto-verified" />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Next of Kin Full Name</Label>
                        <Input value={form.nextOfKinName} onChange={e => update("nextOfKinName", e.target.value)} placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Next of Kin Phone</Label>
                        <Input value={form.nextOfKinPhone} onChange={e => update("nextOfKinPhone", e.target.value)} placeholder="+234 800 000 0000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Select onValueChange={v => update("nextOfKinRelationship", v)} value={form.nextOfKinRelationship}>
                          <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                          <SelectContent>
                            {["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"].map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" onClick={() => setStep(step + 1)} className="flex-1 gradient-primary border-0">
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1 gradient-primary border-0" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Your data is encrypted and securely stored</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
