export default function handle(error: any, res: any) {
  res.status(500);
  res.send(error);
}
