export const convertUrltoFile = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const ext = url.split('.').pop()?.split('?').shift(); // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop()?.split('?').shift(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([blob], filename!, metadata);
};

export const convertUrltoBlob = async (url: string): Promise<Blob> => {
  const res = await fetch(url);
  return await res.blob();
};
