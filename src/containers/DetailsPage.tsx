import { Post, ResponsivePage, withMD2HTML, Colors, Spacing } from '@divops-packages/blog-creco-dev';
import Head from 'next/head';
import { useItem } from '../hooks/useItem';
import { parsePs } from '../utils';

export const DetailsPage = ({ item }: { item: { id: string; body?: { contents: string; createdAt: number; updatedAt: number }}}) => {
  const data = useItem(item.id);
  const is404 = ((data ?? {})?.data ?? item)?.body == null;

  if (is404) {
    return <>404 Page</>;
  }

  const { body, category, date, title} = parsePs((data ?? {})?.data ?? item);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <h4>{category}</h4>
      <p style={{ fontSize: '1rem', color: Colors.DeepDark }}>{item?.id}</p>
      <p style={{ fontSize: '1rem' }}>{date}</p>
      <h1 style={{ textDecoration: 'underline', wordBreak: 'keep-all' }}>{title}</h1>
      <Spacing size={20} />

      <Post dangerouslySetInnerHTML={{ __html: withMD2HTML(body) }} />
    </ResponsivePage>
  )
};
