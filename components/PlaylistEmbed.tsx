import React from 'react';

interface PlaylistEmbedProps {
    url: string;
}

const PlaylistEmbed: React.FC<PlaylistEmbedProps> = ({ url }) => {
    const getEmbedUrl = (playlistUrl: string): string | null => {
        try {
            const urlObj = new URL(playlistUrl);
            // Spotify Playlist
            if (urlObj.hostname === 'open.spotify.com' && urlObj.pathname.includes('/playlist/')) {
                const playlistId = urlObj.pathname.split('/playlist/')[1].split('?')[0];
                return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
            }
            // YouTube Playlist
            if ((urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') && urlObj.searchParams.has('list')) {
                const playlistId = urlObj.searchParams.get('list');
                return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
            }
        } catch (error) {
            console.error("Invalid Playlist URL:", error);
        }
        return null;
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return <div className="text-brand-red p-4 bg-brand-dark-secondary rounded-lg">Invalid Playlist URL provided.</div>;
    }

    const isYouTube = embedUrl.includes('youtube.com');

    return (
        <iframe
            style={{ borderRadius: '12px' }}
            src={embedUrl}
            width="100%"
            height={isYouTube ? "315" : "380"}
            frameBorder="0"
            allowFullScreen={!isYouTube}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Embedded Playlist"
            className="aspect-video sm:aspect-auto"
        ></iframe>
    );
};

export default PlaylistEmbed;
