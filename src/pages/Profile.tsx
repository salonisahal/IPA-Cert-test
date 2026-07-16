import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { userProfile } from '../data/mockData'

const Profile = () => {
  const [name, setName] = useState(userProfile.name)
  const [email, setEmail] = useState(userProfile.email)
  const [phone, setPhone] = useState(userProfile.phone)
  const [notifications, setNotifications] = useState(userProfile.preferences.notifications)

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <SectionHeader title="Profile" description="Manage your account details and preferences." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <img src={userProfile.avatar} alt={userProfile.name} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="text-lg font-semibold text-primary">{userProfile.name}</p>
              <p className="text-sm text-muted">{userProfile.email}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Saved addresses</p>
              <div className="mt-2 space-y-2">
                {userProfile.addresses.map((address) => (
                  <div key={address.id} className="rounded-xl border border-slate-100 p-3 text-sm text-muted">
                    <p className="font-semibold text-primary">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline">Add new address</Button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-primary">Profile settings</h3>
          <div className="mt-4 grid gap-4">
            <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </div>
          <div className="mt-6 rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Notifications</p>
                <p className="text-xs text-muted">Get updates on orders and new arrivals.</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => !prev)}
                className={`h-6 w-12 rounded-full p-1 transition ${notifications ? 'bg-success' : 'bg-slate-200'}`}
              >
                <span className={`block h-4 w-4 rounded-full bg-white transition ${notifications ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button>Save changes</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
