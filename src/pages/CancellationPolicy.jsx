import React, {useEffect} from "react";
import "../styles/Documentation.scss";

const CancellationPolicy = () => {
  useEffect(() => {
    debugger
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="Documentation">
      <div className="heading">Cancellation Policy</div>
      <div className="para">
        You can cancel your membership anytime by visiting "My Account" section
        on the website. Your membership will be cancelled only when the last toy
        that was sent to you is received by our processing centre. If you cancel
        your membership, you will receive the deposit if any paid by you within
        30 days, you will not receive a refund of any membership credits or
        subscription fees already paid. When your membership is cancelled, we
        may terminate your member benefits. <br />
        ToyToy reserves the right to terminate or suspend your account at any
        time, with or without notice, if we find that you have violated the
        Terms, or for any other reason.
      </div>
    </div>
  );
};
export default CancellationPolicy;
