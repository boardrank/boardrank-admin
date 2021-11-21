export const useUseCase = <T>(UseCase: () => T) => {
  return UseCase();
};
