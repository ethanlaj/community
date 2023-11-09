function DownloadTemplateButton({ template, name }) {
  const handleDownloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <button className="btn btn-primary ml-4" type="button" onClick={handleDownloadTemplate} style={{ minWidth: '110px' }}>Template</button>
  );
}

export default DownloadTemplateButton;
