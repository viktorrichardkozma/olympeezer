import classNames from 'classnames';

interface IArtwork { 
    rounded: boolean,
    size: 'sm' | 'md' | 'xl' 
    src: string | undefined,
    alt: string
}

const ArtWork = ({rounded, size, src, alt} : IArtwork) => {

    const sizes = {
        'sm': 'w-14',
        'md': 'w-24',
        'lg': 'w-32',
        'xl': 'w-64',
        '2xl': 'w-96'
    }

    return <img 
        alt = {alt}
        src = {src}
        className = {classNames({'rounded-lg' : rounded}, sizes[size])}
    />

}
  
export default ArtWork;