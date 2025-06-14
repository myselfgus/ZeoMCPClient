// Job Status Endpoint for Vercel
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobId } = req.query;
    
    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    // Mock response for now - will be replaced with MCP server data
    const mockJob = {
      id: jobId,
      status: 'completed',
      progress: 100,
      transcription: 'Paciente relatou dor abdominal há 3 dias, localizada no quadrante superior direito. Nega febre, náuseas ou vômitos. Exame físico revela sensibilidade à palpação. Solicito ultrassom abdominal para investigação.',
      analysis: {
        summary: 'Dor abdominal - investigação necessária',
        keywords: ['dor abdominal', 'quadrante superior direito', 'ultrassom']
      },
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    res.status(200).json(mockJob);

  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
