import m01 from '../assets/illustration/png/m_01_white.png'
import m02 from '../assets/illustration/png/m_02_white.png'
import m03 from '../assets/illustration/png/m_03_white.png'
import m04 from '../assets/illustration/png/m_04_white.png'
import m05 from '../assets/illustration/png/m_05_white.png'
import m07 from '../assets/illustration/png/m_07_white.png'
import m09 from '../assets/illustration/png/m_09_white.png'
import m11 from '../assets/illustration/png/m_11_white.png'
import m12 from '../assets/illustration/png/m_12_white.png'
import m13 from '../assets/illustration/png/m_13_white.png'
import l01 from '../assets/illustration/png/l_01_rectangle_white.png'
import l02 from '../assets/illustration/png/l_02_rectangle_white.png'
import human01 from '../assets/illustration/png/s_human01.png'
import human03 from '../assets/illustration/png/s_human03.png'
import human06 from '../assets/illustration/png/s_human06.png'
import human08 from '../assets/illustration/png/s_human08.png'
import human09 from '../assets/illustration/png/s_human09.png'
import human10 from '../assets/illustration/png/s_human10.png'
import human11 from '../assets/illustration/png/s_human11.png'
import human13 from '../assets/illustration/png/s_human13.png'
import human15 from '../assets/illustration/png/s_human15.png'
import human17 from '../assets/illustration/png/s_human17.png'
import human19 from '../assets/illustration/png/s_human19.png'
import human20 from '../assets/illustration/png/s_human20.png'

export const chapterIllustrations: Record<number, string> = {
  1: l02,   // people group - AI駆動開発の概念
  2: m12,   // two people talking - 材料を渡す相談
  3: m07,   // phone + document - ファイル材料
  4: m09,   // holding card - ドキュメント管理
  5: m04,   // wrench/tools - 実装ツール
  6: m11,   // mailing - 提出/プッシュ
  7: m02,   // checkmark - テスト成功
  8: m13,   // security verification - セキュリティ
  9: m01,   // AI + person - LLM組み込み
  10: m03,  // communication - Claude Chat活用
  11: m05,  // collaborative work - Claude Cowork活用
}

export const heroIllustration = l01

export const handsOnIllustration = m04

export const warningIllustration = m03

export const successIllustration = m02

export const qaAvatars = {
  questioner: [human03, human06, human08, human10, human15, human19],
  answerer: [human01, human09, human11, human13, human17, human20],
}

export const designPhaseHumans = [human08, human13, human20]
