export interface IUseCase<Input, Output, Err = Error> {
  execute(input: Input): Promise<Output | Err> | Output | Err
}
