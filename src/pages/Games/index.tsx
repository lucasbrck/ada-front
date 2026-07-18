import { useMemo, useState } from "react";
import styled from "styled-components";
import DrawingEditor from "components/DrawingEditor";
import TessellationPreview from "components/TessellationPreview";
import { createDefaultTile, validateTileEdges } from "core/tessellationEngine";
import { challenges, wallpaperGroups } from "game/challenges";
import { TessellationProject, TilingMode } from "types";
import { Fonts } from "styles/constants";

const modes: { id: TilingMode; title: string; description: string }[] = [
  { id: "translation", title: "Translação", description: "A peça desliza em linhas e colunas." },
  { id: "rotation-180", title: "Rotação 180°", description: "Peças alternadas dão uma meia-volta." },
  { id: "reflection", title: "Reflexão", description: "A repetição cria versões espelhadas." },
  { id: "glide-reflection", title: "Reflexão deslizante", description: "Espelho e deslocamento trabalham juntos." },
];

const Games = () => {
  const [tile, setTile] = useState(createDefaultTile);
  const [mode, setMode] = useState<TilingMode>("translation");
  const [artwork, setArtwork] = useState("");
  const [artworkSvg, setArtworkSvg] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [colorVariation, setColorVariation] = useState(true);
  const [isometric, setIsometric] = useState(false);
  const [challengeId, setChallengeId] = useState(challenges[0].id);
  const edgeStatus = useMemo(() => validateTileEdges(tile), [tile]);
  const challenge = challenges.find((item) => item.id === challengeId) ?? challenges[0];
  const challengeComplete = edgeStatus.valid && mode === challenge.mode && artwork.length > 100;

  const exportJson = () => {
    const project: TessellationProject = { version: 1, name: "Ada em Padrões", mode, tile, artworkSvg, createdAt: new Date().toISOString() };
    const link = document.createElement("a");
    link.download = "ada-em-padroes.json";
    link.href = URL.createObjectURL(new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }));
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <GamePage>
      <PageHeader>
        <div><Eyebrow>Jogos da Ada</Eyebrow><h1>Ada em <span>Padrões</span></h1><p>Desenhe uma peça, descubra as simetrias e transforme sua ideia em um pavimento sem fim.</p></div>
      </PageHeader>

      <ModeBar aria-label="Tipo de tesselação">
        {modes.map((item) => <ModeButton type="button" key={item.id} $active={mode === item.id} onClick={() => setMode(item.id)}><strong>{item.title}</strong><span>{item.description}</span></ModeButton>)}
      </ModeBar>

      <Workspace>
        <Panel><DrawingEditor tile={tile} onTileChange={setTile} onArtworkChange={(png, svg) => { setArtwork(png); setArtworkSvg(svg); }} /></Panel>
        <Panel><TessellationPreview tile={tile} artwork={artwork} artworkSvg={artworkSvg} mode={mode} showGrid={showGrid} colorVariation={colorVariation} isometric={isometric} /></Panel>
      </Workspace>

      <UtilityBar>
        <Status $valid={edgeStatus.valid}>{edgeStatus.valid ? "Bordas conectadas: a peça pode se repetir sem lacunas." : edgeStatus.messages[0]}</Status>
        <Toggle><input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} /> Grade de construção</Toggle>
        <Toggle><input type="checkbox" checked={colorVariation} onChange={(event) => setColorVariation(event.target.checked)} /> Variação de cor</Toggle>
        <Toggle><input type="checkbox" checked={isometric} onChange={(event) => setIsometric(event.target.checked)} /> Piso isométrico</Toggle>
        <button type="button" onClick={exportJson}>Exportar JSON</button>
      </UtilityBar>

      <LearningGrid>
        <ChallengePanel>
          <Eyebrow>Desafio guiado</Eyebrow><h2>{challenge.title}</h2><p>{challenge.prompt}</p><small>{challenge.tip}</small>
          <ChallengeChoices>{challenges.map((item) => <ChallengeButton type="button" key={item.id} $active={item.id === challengeId} onClick={() => { setChallengeId(item.id); setMode(item.mode); }}>{item.title}</ChallengeButton>)}</ChallengeChoices>
          <Feedback $complete={challengeComplete}>{challengeComplete ? "Desafio concluído! Seu padrão usa a transformação certa e tem bordas compatíveis." : "Escolha o modo do desafio e desenhe uma marca para concluir."}</Feedback>
        </ChallengePanel>
        <LessonPanel>
          <Eyebrow>Laboratório de simetrias</Eyebrow><h2>Os 17 grupos de parede</h2><p>São as combinações possíveis de movimentos que preenchem o plano. Explore os quatro movimentos ativos acima e veja o mapa completo.</p>
          <GroupList>{wallpaperGroups.map(([code, label]) => <li key={code}><strong>{code}</strong><span>{label}</span></li>)}</GroupList>
        </LessonPanel>
      </LearningGrid>
    </GamePage>
  );
};

export default Games;

const GamePage = styled.main`--game-paper:#fffef9;--game-ink:#142b47;--game-muted:#43596b;--game-line:#b6ccd2;width:min(1280px,calc(100% - 48px));margin:0 auto;padding:clamp(34px,5vw,64px) 0 72px;color:var(--game-ink);@media(width <= 600px){width:min(100% - 32px,560px);}`;
const PageHeader = styled.header`display:flex;justify-content:space-between;align-items:start;gap:24px;margin-bottom:28px;h1{margin:4px 0 10px;font-family:${Fonts.Fredoka};font-size:clamp(42px,5vw,64px);line-height:1;color:var(--game-ink);}h1 span{color:#df493c;}p{max-width:650px;color:var(--game-muted);font-family:${Fonts.GilroyMedium};font-size:19px;line-height:1.45;}@media(width <= 600px){flex-direction:column;}`;
const Eyebrow = styled.span`color:#b63f35;font-family:${Fonts.GilroyBold};font-size:13px;text-transform:uppercase;`;
const ModeBar = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px;@media(width <= 800px){grid-template-columns:repeat(2,1fr);}`;
const ModeButton = styled.button<{ $active:boolean }>`display:grid;gap:4px;min-height:74px;padding:12px;text-align:left;border:1px solid ${(p) => p.$active ? "#df493c" : "var(--game-line)"};border-radius:5px;background:${(p) => p.$active ? "#fde4dd" : "var(--game-paper)"};color:#142b47;strong{font-family:${Fonts.GilroyBold};font-size:15px;}span{font-family:${Fonts.GilroyMedium};font-size:13px;line-height:1.25;}`;
const Workspace = styled.div`display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:18px;@media(width <= 900px){grid-template-columns:1fr;}`;
const Panel = styled.section`padding:18px;border:1px solid var(--game-line);border-radius:6px;background:var(--game-paper);box-shadow:5px 5px 0 rgba(216,237,240,.8);min-width:0;`;
const UtilityBar = styled.div`display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:18px 0 36px;padding:12px;border-top:1px solid var(--game-line);border-bottom:1px solid var(--game-line);color:var(--game-muted);font-family:${Fonts.GilroySemiBold};font-size:14px;button{margin-left:auto;min-height:34px;padding:7px 9px;border:1px solid var(--game-line);border-radius:4px;background:var(--game-paper);color:var(--game-ink);font-family:${Fonts.GilroyBold};}@media(width <= 600px){button{margin-left:0;}}`;
const Status = styled.span<{ $valid:boolean }>`color:${(p) => p.$valid ? "#2e7954" : "#b63f35"};`;
const Toggle = styled.label`display:flex;gap:6px;align-items:center;input{accent-color:#df493c;}`;
const LearningGrid = styled.section`display:grid;grid-template-columns:1fr 1fr;gap:18px;@media(width <= 760px){grid-template-columns:1fr;}`;
const LearningPanel = styled.article`padding:22px;border:1px solid var(--game-line);border-radius:6px;background:var(--game-paper);h2{margin:6px 0 10px;font-family:${Fonts.Fredoka};font-size:29px;line-height:1.1;color:var(--game-ink);}p{color:var(--game-muted);font-family:${Fonts.GilroyMedium};line-height:1.45;}small{display:block;margin-top:10px;color:#b63f35;font-family:${Fonts.GilroySemiBold};}`;
const ChallengePanel = styled(LearningPanel)``;
const LessonPanel = styled(LearningPanel)``;
const ChallengeChoices = styled.div`display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;`;
const ChallengeButton = styled.button<{ $active:boolean }>`padding:7px 9px;border:1px solid ${(p) => p.$active ? "#df493c" : "var(--game-line)"};border-radius:4px;background:${(p) => p.$active ? "#fde4dd" : "transparent"};color:var(--game-ink);font-family:${Fonts.GilroyBold};font-size:13px;`;
const Feedback = styled.p<{ $complete:boolean }>`margin-top:14px;color:${(p) => p.$complete ? "#2e7954 !important" : "#43596b !important"};font-family:${Fonts.GilroySemiBold} !important;`;
const GroupList = styled.ul`display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:14px;li{display:flex;gap:7px;align-items:center;color:var(--game-muted);font-family:${Fonts.GilroyMedium};font-size:13px;}strong{min-width:40px;padding:3px 5px;border:1px solid var(--game-line);border-radius:3px;color:#b63f35;font-family:${Fonts.GilroyBold};text-align:center;}`;
