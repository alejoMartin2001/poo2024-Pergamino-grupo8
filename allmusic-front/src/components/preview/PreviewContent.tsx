import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router';

import background from '@images/preview/preview-content.png';

export const PreviewContent = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-40 bg-center bg-cover max-lg:px-10"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${background})`,

      }}
    >
      <div className="flex flex-col justify-start w-1/2 bg-transparent max-lg:w-full">
        <div className="flex flex-col mb-5">
          <h1
            className="mb-8 text-5xl font-medium text-white"
          >
            Conéctate con la
            <b className="font-medium px-2.5 bg-gradient-to-l from-[#9333ea] to-[#db2777] bg-clip-text text-transparent">música</b>
            que te gusta, de manera sencilla.
          </h1>
          <p
            className="font-normal text-gray-400"
          >
            Accede a tus playlists y artistas favoritos con facilidad, y deja que la música te acompañe en cada momento.
          </p>
        </div>

        <div className="flex">
          <button
            className="
						flex justify-center items-center
						w-1/2
						bg-gradient-to-l from-[#9333ea] to-[#db2777] 
					  text-white p-3 text-xl
						font-medium
						rounded-3xl cursor-pointer
						active:scale-[.98] hover:scale-[1.01]
            max-md:w-full
					"
            type="button"
            onClick={() => navigate("/register")}
          >Empezar
            <MoveRight className="pt-1 pl-2" size={30} />
          </button>
        </div>
      </div>

      <div className="w-1/2 max-lg:hidden">
      </div>
    </div>
  )
}