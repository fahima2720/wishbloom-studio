<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All customer-facing content and theme colors live in src/config/birthday.ts; components only read from it — so personalizing never requires touching layout code.
- Static single-page experience, no backend or extra dependencies (confetti is hand-rolled in src/lib/confetti.ts) — keeps it free to host and easy to maintain.
