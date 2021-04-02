import { AuthAtom } from "Contexts/AuthContext";
import { useAtom } from "jotai";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";
import { useMutate } from "Hooks/useQuery";
import { api } from "Api/Api";
import { getPhoto, resizeImage } from "Utils/cameraUtils";
import { getImageAbsolutePath } from "Utils/filePathUtils";

const Avatar: React.FC = () => {
  const [{ user, isLoggedIn }, setAuthAtom] = useAtom(AuthAtom);
  const { mutate: uploadAvatar } = useMutate(api.postUploadUserAvatar);
  const pickProfilePhoto = () => {
    getPhoto({}).then(async (fileDataUrl) => {
      const resizedImage = await (
        await resizeImage({ url: fileDataUrl, maxWidth: 250 })
      ).blob;
      uploadAvatar(
        {
          onSuccess(res) {
            setAuthAtom({
              isLoggedIn,
              user: {
                ...user!,
                avatar: res.data.avatar,
              },
            });
          },
        },
        resizedImage
      );
    });
  };
  return (
    <>
      {user?.avatar ? (
        <AvatarImage
          onClick={pickProfilePhoto}
          src={getImageAbsolutePath(user.avatar.path)}
        />
      ) : (
        <AvatarPlaceholder onClick={pickProfilePhoto} bg="card-bg" isGradient />
      )}
    </>
  );
};

export default Avatar;

const AvatarPlaceholder = styled(FaUserCircle)<colorVariantsPropsType>`
  ${colorVariantsProps}
  font-size:5rem;
  border-radius: 100%;
  fill: white;
`;
const AvatarImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid white;
`;
