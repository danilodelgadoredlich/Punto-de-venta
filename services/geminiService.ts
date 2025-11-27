import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes the image using Gemini 2.5 Flash.
 */
export const analyzeImageContent = async (base64Image: string, mimeType: string): Promise<string[]> => {
  try {
    // Switched to 'gemini-2.5-flash' as 'gemini-2.5-flash-image' does not support JSON mode
    // and is primarily intended for image generation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Analiza esta imagen. Si es un recibo, menú o lista, extrae los nombres de los productos o ítems. Si es una foto de una escena, lista los objetos principales visibles. Devuelve SOLO una lista JSON de strings (array de strings) con los nombres en español. Sé conciso.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    // Parse the JSON response
    const items = JSON.parse(text) as string[];
    return items;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw new Error("No se pudo analizar la imagen. Intenta de nuevo.");
  }
};