import { Dialog, DialogContent } from "@/components/ui/dialog";

import React from "react";

const CommentDialog = ({ showComment, setShowComment }) => {
  return (
    <Dialog open={showComment}>
      <DialogContent onInteractOutside={(e) => setShowComment(false)}>
        <img
          src="https://i.etsystatic.com/45557286/r/il/46408b/5192627263/il_794xN.5192627263_o2x1.jpg"
          alt="post_img"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;