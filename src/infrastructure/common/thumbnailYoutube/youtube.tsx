import React, { useEffect, useRef, useState } from 'react'

declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                options: {
                    height: string;
                    width: string;
                    videoId: string;
                    events: {
                        onReady: (event: { target: YT.Player }) => void;
                        onStateChange: (event: { data: number }) => void;
                    };
                }
            ) => YT.Player;
            PlayerState: {
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                BUFFERING: number;
                CUED: number;
            };
        };
        onYouTubeIframeAPIReady: () => void;
    }

    interface YT {
        Player: YT.Player;
    }

    namespace YT {
        interface Player {
            playVideo: () => void;
            pauseVideo: () => void;
            seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
            getCurrentTime: () => number;
            getPlayerState: () => number;
            getDuration: () => number;
            destroy: () => void;
        }
    }
}

type Props = {
    videoId: string | null;
}
const YoutubeVideo = (props: Props) => {
    const { videoId } = props;
    const playerRef = useRef<YT.Player | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [playerState, setPlayerState] = useState<string>('UNSTARTED');

    // Cleanup interval
    const clearIntervalIfExists = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (videoId) {
            // Clear old interval when videoId changes
            clearIntervalIfExists();
            
            if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                initializePlayer();
                return;
            }
            
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag?.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.head.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = initializePlayer;
        }
        
        // Cleanup on unmount
        return () => {
            clearIntervalIfExists();
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    const initializePlayer = () => {
        if (!window.YT) {
            console.error('YouTube API not loaded');
            return;
        }
        
        if (videoId) {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        }
    };

    const onPlayerReady = (event: { target: YT.Player }) => {
        // Chỉ set interval nếu chưa có
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                // Chỉ get time nếu player đang ở trạng thái PLAYING hoặc BUFFERING
                if (playerRef.current) {
                    const state = playerRef.current.getPlayerState();
                    if (state === 1 || state === 3) { // PLAYING hoặc BUFFERING
                        const time = playerRef.current.getCurrentTime();
                        // Có thể dùng time nếu cần
                    }
                }
            }, 1000);
        }
    };

    const onPlayerStateChange = (event: { data: number }) => {
        const states = {
            0: 'ENDED',
            1: 'PLAYING',
            2: 'PAUSED',
            3: 'BUFFERING',
            5: 'CUED'
        };
        const newState = states[event.data as keyof typeof states] || 'UNKNOWN';
        setPlayerState(newState);
        
        // Xóa interval khi video kết thúc hoặc pause
        if (newState === 'ENDED' || newState === 'PAUSED') {
            clearIntervalIfExists();
        }
        // Tạo lại interval khi play (nếu chưa có)
        else if (newState === 'PLAYING' && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                if (playerRef.current) {
                    const currentState = playerRef.current.getPlayerState();
                    if (currentState === 1 || currentState === 3) {
                        const time = playerRef.current.getCurrentTime();
                    }
                }
            }, 1000);
        }
        
        console.log("Player state changed to:", newState);
    };

    return (
        <div className="video-container">
            <div id="youtube-player"></div>
        </div>
    )
};

export default YoutubeVideo