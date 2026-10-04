import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Obrive | Top AR & VR Services Company';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom right, #001f18, #073933)',
          letterSpacing: '-.02em',
          fontWeight: 700,
          backgroundSize: '100% 100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Simple geometric logo placeholder resembling Obrive's tech vibe */}
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ marginLeft: 16, fontSize: 60, color: 'white', fontFamily: 'sans-serif' }}>Obrive</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '30px 60px',
            fontSize: 50,
            width: 'auto',
            maxWidth: 1000,
            textAlign: 'center',
            color: 'white',
            lineHeight: 1.4,
            fontFamily: 'sans-serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#4ade80',
            fontFamily: 'sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Enterprise Immersive Solutions
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
