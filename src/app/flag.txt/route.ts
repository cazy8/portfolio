import { NextResponse } from "next/server";

export async function GET() {
  const flag = `
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🏴 FLAG{y0u_f0und_th3_s3cr3t_h4rsh_gu9t4_2026}       ║
║                                                          ║
║   Congratulations! You found the hidden flag.            ║
║   If you're reading this, you're curious — and that's    ║
║   exactly the kind of person I want to work with.        ║
║                                                          ║
║   > github.com/cazy8                                     ║
║   > linkedin.com/in/h4rshg                               ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`;

  return new NextResponse(flag, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
