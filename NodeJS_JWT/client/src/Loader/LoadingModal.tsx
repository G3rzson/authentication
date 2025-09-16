type ModalProps = {
  isOpen: boolean;
};

export default function LoadingModal({ isOpen }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Háttér blur réteg */}
      <div className={`absolute inset-0 backdrop-blur-sm bg-black/30`} />

      {/* Modal tartalom */}
      <div
        className={`relative z-10 bg-transparent w-96 transform flex items-center justify-center`}
      >
        <div className="w-32 h-32 border-8 border-green-600 border-t-zinc-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
