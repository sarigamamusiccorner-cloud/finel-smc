import React from 'react';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-brand-dark">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3733_1px,transparent_1px),linear-gradient(to_bottom,#d4af3733_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.4),rgba(255,255,255,0))]"></div>
        </div>
    );
};

export default AnimatedBackground;