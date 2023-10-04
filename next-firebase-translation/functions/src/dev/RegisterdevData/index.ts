import { onCall } from "firebase-functions/v2/https";
import { db } from "../../firebase";
import { appData } from "../../SAMPLEDATA";

export const registerdevdata = onCall({region:"asia-east1"},async(req) => {
  const appCollection = db.collection('apps')
  for(let i=0;i < 50;i++){
    const id = `test${i+1}`;
    appData.appId = id;
    await appCollection.doc(id).set(appData)
  }
  return "ok"
})