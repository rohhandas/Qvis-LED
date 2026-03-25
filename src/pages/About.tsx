import React from 'react';
import { Info, Shield, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
          <Zap className="text-white w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold">Qvis LED Lightings</h1>
        <p className="text-muted-foreground">Smart Lighting Management Platform v1.4.2</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6 space-y-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="font-bold">Version</h3>
          <p className="text-sm text-muted-foreground">1.4.2 (Stable)</p>
        </Card>
        <Card className="text-center p-6 space-y-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold">Security</h3>
          <p className="text-sm text-muted-foreground">AES-256 Encrypted</p>
        </Card>
        <Card className="text-center p-6 space-y-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold">License</h3>
          <p className="text-sm text-muted-foreground">Enterprise Pro</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Welcome to Qvis LED Lightings. By using our platform, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Qvis LED Lightings' relationship with you in relation to this platform.
          </p>
          <h4 className="text-foreground font-bold mt-4">1. Use of the Platform</h4>
          <p>
            The content of the pages of this platform is for your general information and use only. It is subject to change without notice. Unauthorized use of this platform may give rise to a claim for damages and/or be a criminal offense.
          </p>
          <h4 className="text-foreground font-bold mt-4">2. Data Privacy</h4>
          <p>
            Your use of this platform is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the platform and informs users of our data collection practices.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this platform, then you can be assured that it will only be used in accordance with this privacy statement.
          </p>
          <p className="mt-4 italic">
            Last updated: March 25, 2026
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
