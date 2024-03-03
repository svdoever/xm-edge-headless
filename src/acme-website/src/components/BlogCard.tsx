import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Image as JssImage, Link as JssLink, ImageField, Field, LinkField, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
    rendering: ComponentRendering;
    params: ComponentParams;
}

interface BlogCardProps extends ComponentProps {
    fields: {
        image: ImageField;
        articleDate: Field<Date>;
        title: Field<string>;
        summary: Field<string>;
        link: LinkField;
    };
}

interface BlogCardSimpleUIProps {
    imgSrc?: string;
    imgAlt?: string;
    articleDate?: string;
    title?: string;
    summary?: string;
    link?: string;
}

export const BlogCardSimpleUI: React.FC<BlogCardSimpleUIProps> = ({ imgSrc, imgAlt, articleDate, title, summary, link }) => {
    const titleJsx = <h3 className="mt-0.5 text-lg text-gray-900">{title}</h3>;

    return (
        <article
            className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            onClick={() => {
                if (link) {
                    window.location.href = link;
                }
            }}
        >
            {imgSrc && <img alt={imgAlt} src={imgSrc} className="h-56 w-full object-cover" />}
            <div className="bg-white p-4 sm:p-6">
                {articleDate && (
                    <time dateTime={articleDate} className="block text-xs text-gray-500">
                        {new Date(articleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                )}

                {link ? <a href={link}>{titleJsx}</a> : <>{titleJsx}</>}
                {summary && <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{summary}</p>}
            </div>
        </article>
    );
};

export const Simple: (props: BlogCardProps) => JSX.Element = (props: BlogCardProps) => {
    if (!props.fields) {
        return <div>No datasource configured</div>;
    }

    const { image, articleDate, title, summary, link } = props.fields;

    return (
        <BlogCardSimpleUI
            imgSrc={image?.value?.src}
            imgAlt={image?.value?.alt as string | undefined}
            articleDate={articleDate?.value?.toString()}
            title={title?.value}
            summary={summary?.value}
            link={link?.value?.href}
        />
    );
};
