import SecuritySettings from "@/components/settings/security-settings"

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-4xl font-bold text-center">Security Settings</h1>
        <SecuritySettings />
      </div>
    </main>
  )
}
