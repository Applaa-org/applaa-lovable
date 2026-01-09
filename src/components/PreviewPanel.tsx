import { Card } from '@/components/ui/card';
import { Eye, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PreviewPanelProps {
  projectId: number;
}

export default function PreviewPanel({ projectId }: PreviewPanelProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-200 bg-gray-50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="text-violet-600" size={20} />
          <span className="font-semibold text-gray-900">Live Preview</span>
        </div>
        <Button 
          onClick={handleRefresh}
          variant="outline" 
          size="sm"
        >
          <RefreshCw size={16} className="mr-1" />
          Refresh
        </Button>
      </div>

      <div className="flex-1 bg-white p-4">
        <Card className="w-full h-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Eye className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Preview Loading
              </h3>
              <p className="text-gray-600 max-w-md">
                Your application preview will appear here once files are generated.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}