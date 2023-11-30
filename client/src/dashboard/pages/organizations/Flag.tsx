interface FlagProps {
  flag: number;
}

function Flag({ flag }: FlagProps) {
  return (
    <img width={32} height={32} src={`/icons/${flag}.png`} alt={`Flag ${flag}`} />
  );
}

export default Flag;
