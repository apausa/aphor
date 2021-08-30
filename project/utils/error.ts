export default function handle(
  this: any, res: any, error: any,
) {
  this.status(500);
  this.send(error);
}
