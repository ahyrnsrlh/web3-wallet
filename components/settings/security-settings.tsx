"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint, Shield, Key, AlertCircle, CheckCircle2 } from "lucide-react"

export default function SecuritySettings() {
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [autoLockEnabled, setAutoLockEnabled] = useState(true)
  const [autoLockTime, setAutoLockTime] = useState("5")
  const [whitelistEnabled, setWhitelistEnabled] = useState(false)
  const [transactionSimulationEnabled, setTransactionSimulationEnabled] = useState(true)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to a database or local storage
    setSuccess("Security settings saved successfully")
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure security options for your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">
              <Shield className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="authentication">
              <Key className="h-4 w-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Fingerprint className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-lock">Auto-Lock</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically lock your wallet after a period of inactivity
                </div>
              </div>
              <Switch id="auto-lock" checked={autoLockEnabled} onCheckedChange={setAutoLockEnabled} />
            </div>

            {autoLockEnabled && (
              <div className="ml-6 mt-2">
                <Label htmlFor="auto-lock-time">Lock after (minutes)</Label>
                <Input
                  id="auto-lock-time"
                  type="number"
                  value={autoLockTime}
                  onChange={(e) => setAutoLockTime(e.target.value)}
                  className="w-20 mt-1"
                  min="1"
                  max="60"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="whitelist">Address Whitelisting</Label>
                <div className="text-sm text-muted-foreground">Only allow transactions to whitelisted addresses</div>
              </div>
              <Switch id="whitelist" checked={whitelistEnabled} onCheckedChange={setWhitelistEnabled} />
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometric">Biometric Authentication</Label>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition to authenticate transactions
                </div>
              </div>
              <Switch id="biometric" checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>

            <div className="pt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Multi-factor authentication (MFA) is recommended for additional security. Set up MFA in your account
                  settings.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="simulation">Transaction Simulation</Label>
                <div className="text-sm text-muted-foreground">
                  Simulate transactions before sending to detect potential issues
                </div>
              </div>
              <Switch
                id="simulation"
                checked={transactionSimulationEnabled}
                onCheckedChange={setTransactionSimulationEnabled}
              />
            </div>

            <div className="pt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Transaction simulation helps protect against smart contract vulnerabilities and potential scams.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}
