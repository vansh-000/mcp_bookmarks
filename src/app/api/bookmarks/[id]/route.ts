import { NextRequest, NextResponse } from "next/server";
import { deleteUserBookmark } from "@/lib/bookmark.utils";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    const bookmark = await deleteUserBookmark(userId, id);
    return NextResponse.json(bookmark, { status: 200 });
  } catch (error) {
    console.error("Error deleting bookmark", error);
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}
