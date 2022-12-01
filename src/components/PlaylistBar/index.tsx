import List from '@components/helpers/List'
import SongCard from "@components/bits/SongCard";
import useWindowSize from '@hooks/useWindowSize'

import { useAppSelector } from "@hooks/redux";

const PlaylistBar = () => {
    const songs = useAppSelector((state) => state.player.songs)
    const currentSongIndex = useAppSelector( (state) => state.player.currentSongIndex)

    const { height } = useWindowSize()

    return <div className="shadow z-20 relative ">
        <div className="flex justify-start items-center font-bold text-lg h-12 text-white border-b border-r border-gray-200">
            <span className='ml-4 text-gray-800'>olympeezer.</span>
        </div>
        <div className='border-r border-gray-200'>
            <List dimensions={{height: height - 48}} items={songs} renderItem={ (song, index) => <SongCard {...song} isCurrent={currentSongIndex === index} displayedIndex={index+1} key={song.id} />} />    
        </div>
    </div>
}
  
export default PlaylistBar;