import AlbumCover from '@factories/AlbumCover'

import { useAppSelector } from "@hooks/redux";

const AlbumArtContainer = () => {
    const songs = useAppSelector((state) => state.player.songs)
    const currentSongIndex = useAppSelector((state) => state.player.currentSongIndex)
    const { name, cover, artist, color } = songs[currentSongIndex];

    const backgroundGradientStyle = `linear-gradient(-45deg,${color[0]}00, ${color[1]}33)`
  
    return <div className="flex justify-center items-center h-full" style={{background: backgroundGradientStyle}}>
            <div>
                <div>
                    <AlbumCover size="xl" alt={name} src={cover} rounded />
                </div>
                <div className='text-center mt-4'>
                    <span className="block text-gray-800 font-bold text-xl w-full">{name}</span>
                    <span className="text-gray-500 w-full text-sm">{artist}</span>
                </div>
            </div>
    </div>
}
  
export default AlbumArtContainer;