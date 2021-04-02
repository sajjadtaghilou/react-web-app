export function dataURItoBlob(dataURI: any): Blob {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(",")[1]);

	// separate out the mime component
	var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	var ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var blob = new Blob([ab], { type: mimeString });
	return blob;
}
export const objectUrlToDataUrl = (url: string): Promise<string> => {
	return new Promise(async (res, rej) => {
		const blob = await objectUrlToBlob(url);
		const dataUrl = await blobToDataUrl(blob);
		res(dataUrl);
	});
};
export const objectUrlToBlob = (url: string): Promise<Blob> => {
	console.log({ url });

	return new Promise(res => {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "blob";
		xhr.onload = function (e) {
			if (this.status == 200) {
				var blob = this.response;
				res(blob);
			}
		};
		xhr.send();
		// fetch(url).then(r => r.blob()).then(res)
	});
};
export const blobToDataUrl = (blob: Blob): Promise<string> => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.onloadend = function () {
			const result = reader.result;
			if (typeof result === "string") {
				res(result);
			} else {
				rej(new Error("خطا دد انتخاب فایل"));
			}
		};
		reader.readAsDataURL(blob);
	});
};
