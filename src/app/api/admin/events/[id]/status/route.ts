import { eventController } from "@/backend/core/container";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return eventController.handleUpdateStatus(req, resolvedParams.id);
}