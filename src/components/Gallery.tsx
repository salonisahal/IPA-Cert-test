import { useState } from 'react'

const Gallery = ({ images }: { images: string[] }) => {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-4">
      <img src={images[active]} alt="Product" className="h-96 w-full rounded-2xl object-cover" />
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={`h-20 w-20 flex-shrink-0 rounded-xl border ${
              active === index ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img src={image} alt="Thumbnail" className="h-full w-full rounded-xl object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Gallery
