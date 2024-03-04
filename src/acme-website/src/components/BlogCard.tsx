import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Image as JssImage, Link as JssLink, ImageField, Field, LinkField, Text, DateField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

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

export const Simple: (props: BlogCardProps) => JSX.Element = (props: BlogCardProps) => {
    const { sitecoreContext } = useSitecoreContext();
    const editMode = sitecoreContext.pageEditing || sitecoreContext.siteEditing;
    const viewMode = !editMode;

    if (!props.fields) {
        return <div>No datasource configured</div>;
    }

    const dateString = props.fields.articleDate?.value?.toString();
    const dateDisplayString = (new Date(dateString))?.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

    const link = props.fields.link?.value?.href;

    const titleJsx = <Text tag="h3" className="mt-0.5 text-lg text-gray-900" field={props.fields.title} />;

    return (
        <article
            className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            onClick={() => {
                if (link) {
                    window.location.href = link;
                }
            }}
        >
            <JssImage className="h-56 w-full object-cover" field={props.fields.image} />
            <div className="bg-white p-4 sm:p-6">
                {viewMode && dateString && (
                    <time dateTime={dateString} className="block text-xs text-gray-500">
                        {dateDisplayString}
                    </time>
                )}

                {editMode ? <JssLink field={props.fields.link}>{titleJsx}</JssLink> : <>{titleJsx}</>}
                <Text tag="p" className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500" field={props.fields.summary} />
            </div>
        </article>
    );
};
