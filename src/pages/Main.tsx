import React from 'react'
import PlayingBar from '@components/PlayingBar';
import PlaylistBar from '@components/PlaylistBar';
import AlbumArtContainer from '@components/AlbumArtContainer';

const Main = () => <div className="grid grid-cols-12 grid-rows-1">
      <nav className='col-span-3'>
          <PlaylistBar/>
      </nav>
      <main className='grid grid-rows-6 grid-cols-1 col-span-9'>    
        <div className='row-start-1 row-end-6 select-none'>    
          <AlbumArtContainer/>
        </div>
        <div className='row-start-6 row-end-7'>    
          <PlayingBar/>
        </div>
      </main>
    </div>

export default Main;