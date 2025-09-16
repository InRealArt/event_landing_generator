interface PartnershipLabelProps {
  label: string;
}

export default function PartnershipLabel({ label }: PartnershipLabelProps) {
  return (
    <div className="mt-4 flex justify-center">
      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-full shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-purple-700 font-montserrat tracking-wide">
            {label}
          </span>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
