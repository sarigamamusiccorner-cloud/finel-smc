
import React from 'react';

interface SpotifyEmbedProps {
    spotifyUrl: string;
    height?: number;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ spotifyUrl, height = 152 }) => {
    const getEmbedUrl = (url: string): string | null => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname !== 'open.spotify.com') return null;

            if (urlObj.pathname.startsWith('/track/')) {
                const trackId = urlObj.pathname.split('/track/')[1].split('?')[0];
                return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
            }
            if (urlObj.pathname.startsWith('/artist/')) {
                const artistId = urlObj.pathname.split('/artist/')[1].split('?')[0];
                return `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`;
            }
        } catch (error) {
            console.error("Invalid Spotify URL:", error);
        }
        return null;
    };

    const embedUrl = getEmbedUrl(spotifyUrl);

    if (!embedUrl) {
        return <div className="text-brand-red">Invalid Spotify URL provided.</div>;
    }

    return (
        <iframe
            style={{ borderRadius: '12px' }}
            src={embedUrl}
            width="100%"
            height={String(height)}
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Embed"
        ></iframe>
    );
};

export default SpotifyEmbed;
