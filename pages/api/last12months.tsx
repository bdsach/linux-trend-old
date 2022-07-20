import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../data/last12months.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let pageOffset = Number(req.query.pageOffset);
  let pageSize = Number(req.query.pageSize);

  if (Number(pageSize)) {
    const start = Number(pageSize) * pageOffset;
    const end = start + Number(pageSize);
    const page = db.last12months.slice(start, end);

    return res.json({
      items: page,
      nextPageOffset:
        db.last12months.length > end ? Number(pageOffset) + 1 : undefined,
    });
  } else {
    return res.json(db);
  }
}
