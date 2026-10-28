import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  arrowForwardOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import api from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/home';
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi Anda!');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/home';
      } else {
        setErrorMessage('Format respon autentikasi tidak valid.');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setErrorMessage('Kombinasi email atau kata sandi tidak cocok!');
      } else {
        setErrorMessage('Gagal terhubung ke server backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  const setPresetUser = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('password123');
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: '440px', margin: '40px auto 20px auto' }}>
          {/* Header Brand dengan Logo Sekolah Resmi */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                margin: '0 auto 16px auto',
                background: '#ffffff',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                boxShadow: '0 12px 28px rgba(30, 27, 75, 0.45)',
                border: '2.5px solid #6366f1',
              }}
            >
              <img
                src="/logo-smkn1beringin.png"
                alt="Logo SMKN 1 Beringin"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <h1
              style={{
                margin: '0 0 6px 0',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.5px',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Beringin Smart
            </h1>
            <p style={{ margin: 0, color: '#c7d2fe', fontSize: '0.9rem', fontWeight: 600 }}>
              Portal Pengaduan Sarana & Prasarana • Nikita Alviyanti Edition
            </p>
          </div>

          {/* Login Card Modern Indigo */}
          <IonCard
            style={{
              margin: 0,
              borderRadius: '22px',
              background: '#ffffff',
              boxShadow: '0 24px 50px -10px rgba(30, 27, 75, 0.45)',
              border: '1.5px solid #e0e7ff',
              overflow: 'hidden',
            }}
          >
            <IonCardContent style={{ padding: '28px 24px' }}>
              <div style={{ marginBottom: '18px' }}>
                <h2
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#1e1b4b',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Portal Autentikasi
                </h2>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                  Akses terpadu pengaduan sarana prasarana sekolah
                </p>
              </div>

              {/* Quick Fill Pills */}
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '0.72rem', color: '#4338ca', fontWeight: 800, display: 'block', marginBottom: '6px', letterSpacing: '0.4px' }}>
                  AKUN UJI COBA CEPAT:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setPresetUser('nikita@beringin.sch.id')}
                    style={{
                      background: '#eef2ff',
                      border: '1px solid #c7d2fe',
                      borderRadius: '8px',
                      padding: '5px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#4338ca',
                      cursor: 'pointer',
                    }}
                  >
                    👤 Nikita (Siswa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetUser('petugas@beringin.sch.id')}
                    style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: '8px',
                      padding: '5px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#b45309',
                      cursor: 'pointer',
                    }}
                  >
                    🛠️ Bu Ratna (Petugas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetUser('siswa@beringin.sch.id')}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '5px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    👤 Bayu (Umum)
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                    Alamat Email Sekolah
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={mailOutline} style={{ fontSize: '1.2rem', color: '#4338ca', marginRight: '8px' }} />
                    <IonInput
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      placeholder="nikita@beringin.sch.id"
                      required
                      style={{ fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                    Kata Sandi Akun
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={lockClosedOutline} style={{ fontSize: '1.2rem', color: '#4338ca', marginRight: '8px' }} />
                    <IonInput
                      type="password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                      placeholder="••••••••"
                      required
                      style={{ fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <IonButton
                  expand="block"
                  type="submit"
                  disabled={loading}
                  style={{
                    '--background': 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
                    '--background-hover': '#3730a3',
                    '--border-radius': '12px',
                    '--box-shadow': '0 8px 20px rgba(67, 56, 202, 0.35)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    height: '46px',
                    margin: 0,
                  }}
                >
                  {loading ? (
                    <IonSpinner name="crescent" color="light" />
                  ) : (
                    <>
                      <span>Masuk ke Sistem</span>
                      <IonIcon icon={arrowForwardOutline} slot="end" />
                    </>
                  )}
                </IonButton>
              </form>

              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  color: '#64748b',
                }}
              >
                <IonIcon icon={shieldCheckmarkOutline} style={{ color: '#059669', fontSize: '1rem' }} />
                <span>Terotentikasi & Diamankan oleh SMKN 1 Beringin</span>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
