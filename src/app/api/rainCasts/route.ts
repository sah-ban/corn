
// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function GET() {
//   try {
//     const rainboardUrl = `https://api.degen.tips/raindrop/casts?limit=50&offset=0`;


//     // Fetch data from API
//     const { data } = await axios.get(rainboardUrl);

//     // Ensure response is an array
//     const rainboardData = Array.isArray(data) ? data : [{ message: "No allowances available" }];
//     // console.log(rainboardData);
//     console.log(rainboardData[0]);


//     return NextResponse.json({ rainboardData });
//   } catch (error) {
//     console.error("Unexpected error:", error);

//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const rainboardUrl = `https://api.degen.tips/raindrop/casts?limit=50&offset=0`;

    // Fetch data from API
    const { data } = await axios.get(rainboardUrl);

    // Ensure response is an array
    const rainboardData = Array.isArray(data) ? data : [{ message: "No allowances available" }];
    // console.log(rainboardData);

    // Prepare the message from the first item console.log(rainboardData[0]?.cast_hash);

    // const message = rainboardData[0]?.cast_hash
    const message = `https://warpcast.com/~/conversations/${rainboardData[0]?.cast_hash || "No cast hash available"}`;


    // Warpcast API call 
    const warpcastUrl = "https://api.warpcast.com/v2/ext-send-direct-cast";
    const warpcastPayload = {
      recipientFid: 268438,
      message,
      idempotencyKey: "ed3d9b95-5eed-475f-9c7d-58bdc3b9ac00"
    };

    const warpcastResponse = await axios.put(warpcastUrl, warpcastPayload, {
      headers: {
        Authorization: `Bearer wc_secret_a5831caccce36ba9f29b1884fdc962a1e4de1bb2f34e1306a77d56d0_6ef7a781` ,
        "Content-Type": "application/json"
      }
    });

    return NextResponse.json({ rainboardData, warpcastResponse: warpcastResponse.data });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

