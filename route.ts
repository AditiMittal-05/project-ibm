import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'foce-dynamic';

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const response = await client.images.generate({
      model: 'black-forest-labs/flux-dev',
      response_format: 'url',
      response_extension: 'webp',
      width: 1024,
      height: 1024,
      num_inference_steps: 28,
      negative_prompt: '',
      seed: -1,
      loras: null,
      prompt: prompt,
    });

    console.log('Image generated', response);
    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Error generating image:', error);

    if (error?.error?.code === 'content_policy_violation') {
      return NextResponse.json(
        { error: 'Content policy violation. Please try a different prompt.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate image. Please try again.' },
      { status: 500 }
    );
  }
}
