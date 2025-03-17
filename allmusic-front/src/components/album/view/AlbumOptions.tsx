import { GradientIcon, Modal } from "@shared/components";
import { FormInputText } from "@shared/form";
import { FormInputDate } from "@shared/form/FormInputDate";
import { Bookmark, BookmarkCheck, Pencil, SquarePlus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "src/contexts/AuthProvider";

interface AlbumUpdate {
  image: FileList | null;
  albumName: string;
  releaseDate: Date;
}

interface Props {
  images: string;
  username: string;
  albumName: string;
  albumId: number;
  releaseDate: Date;
}

// Arreglar esto.
export const AlbumOptions = ({ images = "", username, albumId, releaseDate, albumName }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const [isPin, setIsPin] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const { register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AlbumUpdate>({
    defaultValues: {
      albumName: albumName,
      releaseDate,
      image: null
    }
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // defaultValues no es persistente. Sólo los datos se establecen en la primera renderización.
  useEffect(() => {
    reset({
      albumName,
      releaseDate,
      image: null
    });
  }, [albumName, releaseDate, reset]);


  return (

    <>
      <div className='flex gap-7 text-gray-400'>
        <div
          className="cursor-pointer "
          onClick={() => setIsPin(!isPin)}
        >
          {isPin ? <Bookmark /> : <GradientIcon Icon={BookmarkCheck} fromColorHex="db2777" toColorHex="3182ce" size={24} />}
        </div>

        {(user?.username === username) &&
          <button
            className='cursor-pointer hover:text-white'
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil />
          </button>
        }
        <div className="cursor-pointer hover:text-white">
          <SquarePlus />
        </div>

        {(user?.username === username) &&
          <div className="cursor-pointer hover:text-red-700">
            <Trash />
          </div>
        }

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Información"
        size="large"
      >
        <div className="max-w-2xl mt-2 mx-auto text-white rounded-lg flex items-center gap-4 md:gap-6 max-md:flex-col">
          <label
            className="relative cursor-pointer w-44 h-44 bg-gray-800 rounded-md overflow-hidden 
              flex items-center justify-center
            "
          >
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Playlist Cover" className="w-full h-full object-cover" />
            ) : (
              <img src={images} className="w-full h-full object-cover" />
            )}
          </label>

          <div className="flex-1 max-md:w-full">
            <FormInputText
              label="Titulo"
              name="albumName"
              register={register}
            />
            <FormInputDate
              label="Fecha de lanzamiento"
              name="releaseDate"
              register={register}
              error={errors.releaseDate}
              requiredMessage="La fecha es obligatoria"
            />
          </div>

        </div>

        <div className="flex items-center justify-end gap-4 text-white max-lg:mt-3">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 cursor-pointer rounded-3xl hover:bg-blue-800 font-medium"
          >
            Guardar
          </button>
        </div>
      </Modal>

    </>
  )
}