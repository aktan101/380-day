import { useTranslation } from "react-i18next"

export function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="w-full py-6 border-t border-[#0abab5]/20">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>
                    © {new Date().getFullYear()} 380 Days to Glory. {t("footer.rights")}
                </p>
            </div>
        </footer>
    )
}
